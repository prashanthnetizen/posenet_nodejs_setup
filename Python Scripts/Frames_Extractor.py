import cv2
import os
import random

# Path to the directory containing Video Files
path_to_video_files = "D:/Computer Engineering/Continuous Sign Translation/test_delete/"


path_to_frames = path_to_video_files
video_files = os.listdir(path_to_video_files)

for file in video_files:
    video = cv2.VideoCapture(path_to_video_files + file)
    flip =True
    count = 0
    success = 1
    arr_img = []
    # If such a directory doesn't exist, creates one and stores its Images
    if not os.path.isdir(path_to_frames + os.path.splitext(file)[0] + "/"):
        os.mkdir(path_to_frames + os.path.splitext(file)[0])
        new_path = path_to_frames + os.path.splitext(file)[0]
        while success:
            success, image = video.read()
            # Frames when generated are getting rotated clockwise by above method, so correcting it
            if flip:
                image = cv2.rotate(image, cv2.ROTATE_90_COUNTERCLOCKWISE)
            arr_img.append(image)
            count += 1
        # Sub sampling the number of frames
        # numbers = sorted(random.sample(range(len(arr_img)), 45))
        count = 0
        for i in range(len(arr_img)):
            cv2.imwrite(new_path + "/%d.png" % count, arr_img[i])
            count += 1
