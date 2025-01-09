from kivy.app import App
from kivy.clock import Clock
from kivy.uix.screenmanager import Screen, ScreenManager
from pyzbar.pyzbar import decode
from PIL import Image

class CameraScreen(Screen):
    pass

class ResultScreen(Screen):
    pass

class ErrorScreen(Screen):
    pass

class MyApp(App):
    def on_start(self):
        # Set up scanning
        self.camera = self.root.get_screen("camera").ids.camera
        self.qrresult = self.root.get_screen("camera").ids.qrresult
        self.result_label = self.root.get_screen("result").ids.result_label
        Clock.schedule_interval(self.scan_camerafeed, 1 / 10)  # Scan 10 times per second
        self.blueRedLabel = self.root.get_screen("result").ids.food_label
        self.saladLabel = self.root.get_screen("result").ids.salad_label
        self.currentID = -1
        self.gotFoodList = []

    def scan_camerafeed(self, dt):

        #self.setFoodToColor((0, 1, 0, 1))
        #self.set_food_background((0, 1, 0, 1))
        #self.set_salad_backround((0.5, 1, 0, 1))
        if not self.camera.texture:
            print("No camera texture available yet!")
            return

        frame = self.camera.texture
        frame_buffer = frame.pixels
        width, height = frame.size

        try:
            # Convert the frame to a PIL Image
            pil_image = Image.frombytes(mode='RGBA', size=(width, height), data=frame_buffer)

            # Decode QR codes
            decoded_objects = decode(pil_image)
            if decoded_objects:
                qr_data = decoded_objects[0].data.decode('utf-8')
                self.currentID = int(qr_data)
                self.configureFakeResultPage(qr_data)
                self.qrresult.text = f"QR Code: {qr_data}"
                self.result_label.text = "Bestellung von: nameOf(" + qr_data + ")"
                if int(qr_data) in self.gotFoodList:
                    self.switch_to_error_screen()
                else:
                    
                    self.switch_to_result_screen()
            else:
                self.qrresult.text = "No QR Code found!"
        except Exception as e:
            print(f"Error processing frame: {e}")

    def setFoodToColor(self, color):
        with self.blueRedLabel.canvas.before:
            self.blueRedLabel.canvas.before.clear()  # Clear the existing background
            from kivy.graphics import Color, Rectangle
            Color(color)  # New background color (red)
            #Rectangle(pos=self.blueRedLabel.canvas.before.pos, size=self.blueRedLabel.canvas.before.size)

    def set_food_background(self, color):
        """Dynamically set the background color of the label."""
        label = self.root.get_screen("result").ids.food_label

        # Update the canvas.before with the new color
        with label.canvas.before:
            label.canvas.before.clear()  # Clear previous drawing
            from kivy.graphics import Color, Rectangle
            Color(*color)  # Unpack the RGBA tuple
            Rectangle(pos=label.pos, size=label.size)

    def set_salad_backround(self, color):
        label = self.root.get_screen("result").ids.salad_label

        # Update the canvas.before with the new color
        with label.canvas.before:
            label.canvas.before.clear()  # Clear previous drawing
            from kivy.graphics import Color, Rectangle
            Color(*color)  # Unpack the RGBA tuple
            Rectangle(pos=label.pos, size=label.size)

    def configureFakeResultPage(self, qrResult):
        resultNumber = int(qrResult)

        if resultNumber % 2 == 0:
            self.set_food_background((0, 0, 1, 0.5)) #blue

        else:
            self.set_food_background((1, 0, 0, 0.5)) #red

        if resultNumber % 5 == 0:
            self.set_salad_backround((0, 1, 0, 0.5)) #yes, salad

        else:
            self.set_salad_backround((0.2, 0.2, 0.2, 0.5)) #no, saladn't


        
    def makeDeliveryStatusUpdate(self):
        print("updating delivery status for user with id: ", self.currentID)
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
