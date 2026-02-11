import os
from PIL import Image

def heavy_compress(root_folder, output_folder, quality=20):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.bmp')

    for subdir, dirs, files in os.walk(root_folder):
        for file in files:
            if file.lower().endswith(valid_extensions):
                file_path = os.path.join(subdir, file)
                
                rel_path = os.path.relpath(subdir, root_folder)
                new_subdir = os.path.join(output_folder, rel_path)
                if not os.path.exists(new_subdir):
                    os.makedirs(new_subdir)
                
                # Change extension to .jpg for the output file
                base_name = os.path.splitext(file)[0]
                output_path = os.path.join(new_subdir, f"{base_name}.jpg")

                try:
                    with Image.open(file_path) as img:
                        # Convert to RGB (Required for JPEG and removes alpha channel)
                        img = img.convert('RGB')
                        
                        # Apply heavy compression
                        img.save(output_path, "JPEG", optimize=True, quality=quality)
                        print(f"Compressed: {file} -> {os.path.getsize(output_path)//1024}KB")
                except Exception as e:
                    print(f"Error: {e}")

# --- Settings ---
ROOT_FOLDER = r'C:\Users\Kayan\Downloads\events'
OUTPUT_FOLDER = 'heavy_compressed_output'
COMPRESSION_QUALITY = 20 # Lower this to 10 if you want even smaller files

heavy_compress(ROOT_FOLDER, OUTPUT_FOLDER, COMPRESSION_QUALITY)