// uniform vec2 iResolution;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}


vec2 movingTiles(vec2 _st, float _zoom, float _speed){
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

void main(void){
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    // st.x*=iResolution.x/iResolution/y;
    st.x*=iResolution.x/iResolution.y;

    vec3 color = vec3(0.0);

    // Divide the space in 4
    st = movingTiles(st,15.,0.5);

    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st,PI*0.);

    // Draw a square
    color = vec3(box(st,vec2(0.5),0.01));
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}