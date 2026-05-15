export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "mohammad-portfolio/_app",
	assets: new Set([".nojekyll","Mohammad Ahmad CV.pdf","assets/images/projects/Carbonteq.png","assets/images/projects/DTUCA.png","assets/images/projects/DTUCP.png","assets/images/projects/FCH.png","assets/images/projects/PT.png","assets/sprites/basketBall.png","assets/sprites/hoop.png","favicon.png"]),
	mimeTypes: {".pdf":"application/pdf",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.C-Ov102-.js",app:"_app/immutable/entry/app.BkHu9YrM.js",imports:["_app/immutable/entry/start.C-Ov102-.js","_app/immutable/chunks/B4HqrJLn.js","_app/immutable/chunks/Du7lhx0e.js","_app/immutable/chunks/FHKYGlkF.js","_app/immutable/entry/app.BkHu9YrM.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Du7lhx0e.js","_app/immutable/chunks/BPOv91_H.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
