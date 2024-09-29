void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
   
    vec2 uv = fragCoord.xy*2.0-iResolution.xy;
    vec4 o;
    vec2 p ,c;
    float a;
    // int N;
    // N = 400.;
    for(float i = 0.0;i<400.;i++){
        a=  i/2e2-1.0;
        p = cos(i*2.4+iTime+vec2(0,3.14/2.0))*sqrt(1.0-a*a);
        c = uv/iResolution.y+vec2(p.x,a)/(p.y+2.0);
        o+=(cos(i+vec4(0,2,4,0))+1.0)/dot(c,c)*(1.0-p.y)/3e4;
    }
   
    fragColor = o;
}