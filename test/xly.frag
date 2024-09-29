mat2 rot(float angle){
    float c= cos(angle);
    float s=  sin(angle);
    return mat2(c,-s,s,c);
}
float sdCircle(vec2 p,float r){
    return length(p)-r;
}
float gouyu(vec2 p,float angle){
     p*=rot(angle);
     float w = 1.0/iResolution.y;
     float  c = sdCircle(p,0.2);
     float c2 = sdCircle(p-vec2(-0.1,0.0),0.103);
     float s = max(-c2,c);
     s = max(s,p.y);
     float c3 = sdCircle(p-vec2(0.102,0.0),0.099);
     s = min(s,c3);
     
     return smoothstep(w,-w,s);
}

float gouyu3(vec2 p){
    p*=1.8;
    float g = gouyu(p-vec2(0.00,0.4),radians(140.));
    g+=gouyu(p-vec2(1.732*.2,-0.4*0.5),radians(260.));
    g+=gouyu(p-vec2(-1.732*.2,-0.4*0.5),radians(0.));
    return g;
}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float w = 1.0/iResolution.y;
    vec2 uv = fragCoord/iResolution.xy;
    uv-=0.5;
    uv.x*=iResolution.x/iResolution.y;
    vec3 col = vec3(1.0);
    
    float backGround = smoothstep(+w,-w,sdCircle(uv,0.4));
    col = mix(col,vec3(1.0,0.0,0.0),backGround);
    
    float ring = abs(sdCircle(uv,0.4))-0.01;
    float edge = smoothstep(+w,-w,ring);
    col = mix(col,vec3(0.0),edge);
    
    float d= length(uv);
    float dark = step(d,0.4)*smoothstep(0.32,0.42,d); 
    col = mix(col,vec3(0.0),dark*0.8);
    
    vec2 guv = uv;
    guv*=rot(iTime*0.2);
    float g = gouyu3(guv);
    col = mix(col,vec3(0.0),g);
    
    
    float c = smoothstep(+w,-w,sdCircle(uv,0.08));
    col = mix(col,vec3(0.0,0.0,0.0),c);
    
    d = length(uv-vec2(-0.18,0.15));
    col =mix(col,vec3(1.0),smoothstep(0.15,0.0,d));
    
    fragColor = vec4(col,1.0);
}