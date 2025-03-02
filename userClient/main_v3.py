import requests
from kivy.app import App
from kivy.clock import Clock
from kivy.uix.screenmanager import Screen, ScreenManager
from kivy.graphics import Color, Rectangle
from pyzbar.pyzbar import decode
from PIL import Image

class CameraScreen(Screen):
    pass

class ResultScreen(Screen):
    pass

class ErrorScreen(Screen):
    pass

class MyApp(App):
    API_URL = "http://localhost:5000/order/today/{}"

    def on_start(self):
        self.camera = self.root.get_screen("camera").ids.camera
        self.qrresult = self.root.get_screen("camera").ids.qrresult
        self.result_label = self.root.get_screen("result").ids.result_label
        self.food_label = self.root.get_screen("result").ids.food_label
        self.salad_label = self.root.get_screen("result").ids.salad_label
        self.currentID = -1
        self.gotFoodList = []
        Clock.schedule_interval(self.scan_camerafeed, 1 / 10)

    def scan_camerafeed(self, dt):
        if not self.camera.texture:
            print("No camera texture available yet!")
            return

        frame = self.camera.texture
        frame_buffer = frame.pixels
        width, height = frame.size

        try:
            pil_image = Image.frombytes(mode='RGBA', size=(width, height), data=frame_buffer)
            decoded_objects = decode(pil_image)
            if decoded_objects:
                qr_data = decoded_objects[0].data.decode('utf-8')
                self.currentID = int(qr_data)
                self.qrresult.text = f"QR Code: {qr_data}"

                if int(qr_data) in self.gotFoodList:
                    self.switch_to_error_screen()
                else:
                    self.fetch_order_data(qr_data)
            else:
                self.qrresult.text = "No QR Code found!"
        except Exception as e:
            print(f"Error processing frame: {e}")

    def fetch_order_data(self, person_id):
        print("fetched!")
        try:
            response = requests.get(self.API_URL.format(person_id))
            if response.status_code == 200:
                print("200 was response")
                data = response.json()
                self.update_result_screen(data)
                self.switch_to_result_screen()
            else:
                print(f"Error fetching data: {response.status_code}")
                self.switch_to_error_screen()
        except requests.exceptions.RequestException as e:
            print(f"Request error: {e}")
            self.switch_to_error_screen()

    

    def update_result_screen(self, data):
        print("updating!")
        self.result_label.text = f"{data['person']['name']} ({data['person']['id']})"
        self.food_label.text = f"Essen: {data['meal']}"
        self.salad_label.text = f"Salat: {data['salad']}"

        # Hintergrundfarbe abhängig vom Text setzen
        if "red" in data['meal'].lower():
            self.food_label.color = (1, 1, 1, 1)  # Weißer Text
            self.food_label.canvas.before.clear()
            with self.food_label.canvas.before:
                Color(1, 0, 0, 1)  # Rot
                Rectangle(pos=self.food_label.pos, size=self.food_label.size)
        else:
            self.food_label.color = (1, 1, 1, 1)  # Weißer Text
            self.food_label.canvas.before.clear()
            with self.food_label.canvas.before:
                Color(0, 0, 1, 1)  # Blau
                Rectangle(pos=self.food_label.pos, size=self.food_label.size)

        print("done updating!")



    def makeDeliveryStatusUpdate(self):
        print(f"Updating delivery status for user with ID: {self.currentID}")
        self.gotFoodList.append(self.currentID)
        self.switch_to_camera_screen()

    def switch_to_result_screen(self):
        self.root.current = "result"

    def switch_to_camera_screen(self):
        self.root.current = "camera"

    def switch_to_error_screen(self):
        self.root.current = "error"

if __name__ == "__main__":
    MyApp().run()
