void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;



        uv = (2.*uv-1.);
        uv.x*=iResolution.x/iResolution.y;
	
		uv.y -= 0.25;
		
    	// background color
    	vec3 bcol = vec3(1.0,0.8,0.7-0.07*uv.y)*(1.0-0.25*length(uv));
		
    	// animate
    	float tt = mod(iTime,1.5)/1.5;
    	float ss = pow(tt,.2)*0.5 + 0.5;
    	ss = 1.0 + ss*0.5*sin(tt*6.2831*3.0 + uv.y*0.5)*exp(-tt*4.0);
    	//uv *= vec2(0.5,1.5) + ss*vec2(0.5,-0.5);
        uv*=vec2(0.5+0.5*ss,1.5-0.5*ss);
    	//uv*=vec2(0.5,1.5);
        //uv+=uv
		
    	// shape
    	float a = atan(uv.x,uv.y)/3.141593;
    	float dist = length(uv);
    	float h = abs(a);
    	float edge = (13.0*h - 22.0*h*h + 10.0*h*h*h)/(6.0-5.0*h);
		
		// color
		float s = 1.0-0.5*clamp(dist/edge,0.0,1.0);
		s = 0.75 + 0.75*uv.x;
		s *= 1.0-0.25*dist;
		s = 0.5 + 0.6*s;
		s *= 0.5+0.5*pow( 1.0-clamp(dist/edge, 0.0, 1.0 ), 0.1 );
		vec3 hcol = vec3(1.0,0.5*dist,0.3)*s;
		
    	vec3 col = mix( bcol, hcol, smoothstep( -0.01, 0.01, edge-dist) );
		
		fragColor = vec4(col,1.0);
}