// Author @patriciogv - 2015 - patricio.io

#ifdef GL_ES
precision mediump float;
#endif
#include "PixelSpiritDeck/lib/fill.glsl"
#include "PixelSpiritDeck/lib/stroke.glsl"
#include "PixelSpiritDeck/lib/rectSDF.glsl"

const float PI = 3.1415926535897932384626433832795;

uniform vec2 u_mouse;

vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = iTime*_speed;
    if( fract(time)>0.5 ){
        if (fract( _st.y * 0.5) > 0.5){
            _st.x += fract(time)*2.0;
        } else {
            _st.x -= fract(time)*2.0;
        }
    } else {
        if (fract( _st.x * 0.5) > 0.5){
            _st.y += fract(time)*2.0;
        } else {
            _st.y -= fract(time)*2.0;
        }
    }
    return fract(_st);
}


vec2 movingTiles1(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = iTime*_speed;
 
     _st.x += fract(time)*2.0;

    
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

float circle(vec2 _st, float _radius){
    vec2 pos = vec2(0.5)-_st;
    return smoothstep(1.0-_radius,1.0-_radius+_radius*0.2,1.-dot(pos,pos)*3.14);
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st.x *= iResolution.x/iResolution.y;

    st = movingTiles1(st,15.,0.5);

    vec3 color = vec3( 1.0-box(st, vec2(0.5),0.01 ) );


    float rect = rectSDF(st,vec2(1.));

    color += stroke(rect,1.,.5);

    gl_FragColor = vec4(color,1.0);
}
