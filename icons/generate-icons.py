"""Run once to generate icon-192.png and icon-512.png from icon.svg.
Requires: pip install cairosvg   (or: pip install Pillow + svglib)
"""
import sys, os

svg_path = os.path.join(os.path.dirname(__file__), 'icon.svg')

try:
    import cairosvg
    for size in [192, 512]:
        out = os.path.join(os.path.dirname(__file__), f'icon-{size}.png')
        cairosvg.svg2png(url=svg_path, write_to=out, output_width=size, output_height=size)
        print(f'  icon-{size}.png generado')
except ImportError:
    print('cairosvg no instalado. Prueba:  pip install cairosvg')
    print('O usa: https://svgtopng.com  para convertir icon.svg manualmente a 192 y 512 px')
