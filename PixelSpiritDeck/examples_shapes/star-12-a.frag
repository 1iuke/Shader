

//GLOBAL_START
#include "../lib/starSDF.glsl"
#include "../lib/fill.glsl"
//GLOBAL_END

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec3 color = vec3(0.);
    vec2 st = fragCoord.xy/iResolution.xy;
    st = mix(vec2((st.x*iResolution.x/iResolution.y)-(iResolution.x*.5-iResolution.y*.5)/iResolution.y,st.y), 
             vec2(st.x,st.y*(iResolution.y/iResolution.x)-(iResolution.y*.5-iResolution.x*.5)/iResolution.x), 
             step(iResolution.x,iResolution.y));
    //START
    color += fill(starSDF(st, 12, .375), .75);
    //END
    fragColor = vec4(color,1.);
}