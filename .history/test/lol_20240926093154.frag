#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
const vec3 c = vec3(0.0431, 0.5843, 0.8314);
const float PI = 3.1415926535;

float sdbox(vec2 uv,float r ){
    return max(abs(uv.x),abs(uv.y))-r;
}
float box(vec2 uv,float side,float r,float thickness,float blur){

    uv -=vec2(r,0.0)*1.414*side;
    vec2 uv2 = rot(step(side,0.0)*PI)*uv;
    float angle = (atan(uv2.y,uv2.x)/PI)*0.5+0.5;
    uv =rot(1.57/2.0)*uv;  
    float b1 = sdbox(uv,r);
    float t = iTime*1.2;
    if(mod(t,4.0)<1.0){
         return smoothstep(thickness,0.00+blur,abs(b1))*step(angle,smoothstep(0.0,1.0,fract(t)));
    }else if(mod(t,4.0)>=1.0&&mod(t,4.0)<=2.0){
         return smoothstep(thickness,0.00+blur,abs(b1))*step(smoothstep(0.0,1.0,fract(t)),angle);
    }
    
}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    
    vec2 uv = (fragCoord-iResolution.xy*.5)/iResolution.y;
    vec3 col = vec3(0);
    
    vec2 uv1=uv;
    float angle = atan(uv1.x,uv1.y)-iTime;
    float d = length(uv1*10.0)-2.0;
    vec2 uv2= vec2(1.5*fract(angle*3.5),d);
    d = length(uv2-vec2(0.5,0.5));
    col=mix(col,c,smoothstep(0.25,0.0,d));    
    

    float t = iTime*1.2;
    vec2 uv3=uv* rot(step(mod(t*1.5,2.0),1.0)*0.5*3.1415926*smoothstep(0.0,1.0,fract(t*1.5)));    
    float b1 = sdbox(rot(1.57/2.0)*uv3,0.14);
    col=mix(col,c,smoothstep(0.012,0.008,abs(b1)));
   
   
    col=mix(col,c,box(uv,-1.0,0.20,0.003,0.0));
    col=mix(col,c,box(uv,1.0,0.20,0.003,0.0));
    col=mix(col,c,box(uv,-1.0,0.1,0.015,0.005));
    col=mix(col,c,box(uv,1.0,0.1,0.015,0.005));
    
    fragColor = vec4(col,1.0);
}