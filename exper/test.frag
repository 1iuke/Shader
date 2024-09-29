void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
   
    vec2 uv = fragCoord/iResolution.xy;     
    vec3 col = vec3(1.0); 
    uv.x*=iResolution.x/iResolution.y;
    
    float d= smoothstep(0.2,1.5,uv.x);
    col*=d;
    
    fragColor = vec4(col,1.0);
}