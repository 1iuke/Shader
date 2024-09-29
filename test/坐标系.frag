float sdCircle(vec2 uv,float r){
    return length(uv)-r;
}

float sdRect(vec2 uv,float r){
    return max(abs(uv.x),abs(uv.y))-r;
}

float sdRoundedBox( in vec2 p, in vec2 b, in vec4 r )
{
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;
    vec2 q = abs(p)-b+r.x;
    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}


float sdEquilateralTriangle( in vec2 p, in float r )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x) - r;
    p.y = p.y + r/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0*r, 0.0 );
    return -length(p)*sign(p.y);
}
float sdPentagon( in vec2 p, in float r )
{
    const vec3 k = vec3(0.809016994,0.587785252,0.726542528);
    p.x = abs(p.x);
    p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y);
    p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y);
    p -= vec2(clamp(p.x,-r*k.z,r*k.z),r);    
    return length(p)*sign(p.y);
}
mat2 rot(float angle){
    float c= cos(angle);
    float s=  sin(angle);
    return mat2(c,-s,s,c);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
     float w = 1.0/iResolution.y;
    vec2 uv = fragCoord/iResolution.xy;
    uv-=0.5;
    uv.x*=iResolution.x/iResolution.y;
    vec3 col = vec3(0.0);

    float r= smoothstep(w,-w, sdRect(uv-vec2(0.2,0.2),0.2) ); 
    col = mix(col,vec3(0.0,0.0,1.0),r);
   
    float c= smoothstep(w,-w, sdCircle(uv-vec2(-0.2,-0.2),0.2) );
    col = mix(col,vec3(1.0,0.0,1.0),c);


    float d= smoothstep(w,-w, sdBox(uv-vec2(-0,-0.3),vec2(0.1,0.5)) );
    col = mix(col,vec3(0.2549, 0.8392, 0.6157),d);

    float e= smoothstep(w,-w, sdEquilateralTriangle(uv-vec2(0.2,-0.3),0.2) );
    col = mix(col,vec3(0.3216, 0.5804, 0.1725),e);


float f= smoothstep(w,-w, sdPentagon(uv-vec2(0.2,0.5),0.2) );
    col = mix(col,vec3(0.3216, 0.5804, 0.1725),f);

    fragColor = vec4(col,1.0);
}