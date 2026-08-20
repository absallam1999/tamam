export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Build backend URL - use HTTPS
  const backendUrl = `https://tamam.runasp.net${url.pathname}${url.search}`;
  
  try {
    // Forward request to backend
    const response = await fetch(backendUrl, {
      method: request.method,
      headers: {
        'Content-Type': request.headers.get('Content-Type') || 'application/json',
        'Accept': 'application/json',
        ...(request.headers.get('Authorization') && {
          'Authorization': request.headers.get('Authorization')
        }),
      },
      body: request.method !== 'GET' && request.method !== 'HEAD' 
        ? await request.text() 
        : undefined,
    });

    // Create new response with CORS headers
    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });

    // Add CORS headers
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
    modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    modifiedResponse.headers.set('Access-Control-Max-Age', '86400');

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: modifiedResponse.headers
      });
    }

    return modifiedResponse;
  } catch (error) {
    console.error('API Proxy Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'API proxy error',
      error: error.message
    }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}