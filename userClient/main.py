from kivy.app import App
from kivy.clock import Clock
from pyzbar.pyzbar import decode
from PIL import Image

class MyApp(App):

    def on_start(self):
        Clock.schedule_interval(self.scanCamerafeed, 1)
        self.camera = self.root.ids.camera
        self.displayLabel = self.root.ids.qrresult
   

    def printTest(self, dt):
        
        print("dies ist ein Test! " + str(dt))

    def scanCamerafeed(self, dt):
        
        # Capture the current frame as an image
        frame = self.camera.texture
        if not frame:
            print("returned cuz no frame!")
            return

        # Convert the frame to a PIL Image
        frame_buffer = frame.pixels
        width, height = frame.size
        pil_image = Image.frombytes(mode='RGBA', size=(width, height), data=frame_buffer)

        # Decode QR codes in the image
        decoded_objects = decode(pil_image)

        # Update the label if a QR code is found
        if decoded_objects:
            qr_data = decoded_objects[0].data.decode('utf-8')
            self.displayLabel.text = str(qr_data)
        else:
            self.displayLabel.text = "No QR-Code found!"

if __name__ == "__main__":
    MyApp().run()
