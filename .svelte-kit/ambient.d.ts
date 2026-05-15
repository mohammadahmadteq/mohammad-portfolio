
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const LSCOLORS: string;
	export const USER_ZDOTDIR: string;
	export const LESSHISTFILE: string;
	export const COLORTERM: string;
	export const HYPRLAND_CMD: string;
	export const XDG_CONFIG_DIRS: string;
	export const LESS: string;
	export const XDG_SESSION_PATH: string;
	export const XDG_MENU_PREFIX: string;
	export const TERM_PROGRAM_VERSION: string;
	export const XDG_BACKEND: string;
	export const QT_WAYLAND_DISABLE_WINDOWDECORATION: string;
	export const HISTSIZE: string;
	export const FPATH: string;
	export const NODE: string;
	export const LC_ADDRESS: string;
	export const LC_NAME: string;
	export const XDG_DATA_HOME: string;
	export const XDG_CONFIG_HOME: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const APP2UNIT_SLICES: string;
	export const npm_config_local_prefix: string;
	export const HOMEBREW_PREFIX: string;
	export const LIBVA_DRIVER_NAME: string;
	export const DESKTOP_SESSION: string;
	export const LC_MONETARY: string;
	export const HL_INITIAL_WORKSPACE_TOKEN: string;
	export const NO_AT_BRIDGE: string;
	export const EDITOR: string;
	export const SCREENRC: string;
	export const XDG_SEAT: string;
	export const PARALLEL_HOME: string;
	export const PWD: string;
	export const XDG_VIDEOS_DIR: string;
	export const LOGNAME: string;
	export const XDG_SESSION_DESKTOP: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const XDG_SESSION_TYPE: string;
	export const SYSTEMD_EXEC_PID: string;
	export const _: string;
	export const XDG_PICTURES_DIR: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const MOTD_SHOWN: string;
	export const VSCODE_INJECTION: string;
	export const HYPRLAND_CONFIG: string;
	export const HOME: string;
	export const XDG_PUBLICSHARE_DIR: string;
	export const LANG: string;
	export const LC_PAPER: string;
	export const HISTFILE: string;
	export const HYPRLAND_NO_SD_NOTIFY: string;
	export const LS_COLORS: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const PYTHONSTARTUP: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const STARSHIP_SHELL: string;
	export const STARSHIP_CACHE: string;
	export const WAYLAND_DISPLAY: string;
	export const STARSHIP_CONFIG: string;
	export const XDG_DOWNLOAD_DIR: string;
	export const GIT_ASKPASS: string;
	export const XDG_SEAT_PATH: string;
	export const XDG_MUSIC_DIR: string;
	export const XDG_TEMPLATES_DIR: string;
	export const INVOCATION_ID: string;
	export const SAVEHIST: string;
	export const MANAGERPID: string;
	export const CHROME_DESKTOP: string;
	export const STARSHIP_SESSION_KEY: string;
	export const QT_QPA_PLATFORM: string;
	export const UWSM_WAIT_VARNAMES: string;
	export const XDG_CACHE_HOME: string;
	export const INFOPATH: string;
	export const npm_lifecycle_script: string;
	export const NVM_DIR: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
	export const CLAUDE_CODE_SSE_PORT: string;
	export const XDG_SESSION_CLASS: string;
	export const XDG_DESKTOP_DIR: string;
	export const TERM: string;
	export const LC_IDENTIFICATION: string;
	export const npm_package_name: string;
	export const ZSH: string;
	export const PYTHON_BASIC_REPL: string;
	export const ZDOTDIR: string;
	export const USER: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const HOMEBREW_CELLAR: string;
	export const HYPRLAND_INSTANCE_SIGNATURE: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const NVM_CD_FLAGS: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const PAGER: string;
	export const LC_TELEPHONE: string;
	export const HOMEBREW_REPOSITORY: string;
	export const LC_MEASUREMENT: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const MANAGERPIDFDID: string;
	export const npm_config_user_agent: string;
	export const CUDA_DISABLE_PERF_BOOST: string;
	export const GPU_SETUP: string;
	export const XDG_STATE_HOME: string;
	export const npm_execpath: string;
	export const FC_FONTATIONS: string;
	export const XDG_RUNTIME_DIR: string;
	export const DEBUGINFOD_URLS: string;
	export const npm_package_json: string;
	export const LC_TIME: string;
	export const BUN_INSTALL: string;
	export const XDG_DOCUMENTS_DIR: string;
	export const APP2UNIT_TYPE: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const JOURNAL_STREAM: string;
	export const XDG_DATA_DIRS: string;
	export const GDK_BACKEND: string;
	export const PATH: string;
	export const __GLX_VENDOR_LIBRARY_NAME: string;
	export const GDK_SCALE: string;
	export const GBM_BACKEND: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const MAIL: string;
	export const UWSM_FINALIZE_VARNAMES: string;
	export const npm_node_execpath: string;
	export const LC_NUMERIC: string;
	export const OLDPWD: string;
	export const HYPRLAND_NO_SD_VARS: string;
	export const TERM_PROGRAM: string;
	export const NODE_ENV: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		LSCOLORS: string;
		USER_ZDOTDIR: string;
		LESSHISTFILE: string;
		COLORTERM: string;
		HYPRLAND_CMD: string;
		XDG_CONFIG_DIRS: string;
		LESS: string;
		XDG_SESSION_PATH: string;
		XDG_MENU_PREFIX: string;
		TERM_PROGRAM_VERSION: string;
		XDG_BACKEND: string;
		QT_WAYLAND_DISABLE_WINDOWDECORATION: string;
		HISTSIZE: string;
		FPATH: string;
		NODE: string;
		LC_ADDRESS: string;
		LC_NAME: string;
		XDG_DATA_HOME: string;
		XDG_CONFIG_HOME: string;
		MEMORY_PRESSURE_WRITE: string;
		APP2UNIT_SLICES: string;
		npm_config_local_prefix: string;
		HOMEBREW_PREFIX: string;
		LIBVA_DRIVER_NAME: string;
		DESKTOP_SESSION: string;
		LC_MONETARY: string;
		HL_INITIAL_WORKSPACE_TOKEN: string;
		NO_AT_BRIDGE: string;
		EDITOR: string;
		SCREENRC: string;
		XDG_SEAT: string;
		PARALLEL_HOME: string;
		PWD: string;
		XDG_VIDEOS_DIR: string;
		LOGNAME: string;
		XDG_SESSION_DESKTOP: string;
		QT_QPA_PLATFORMTHEME: string;
		XDG_SESSION_TYPE: string;
		SYSTEMD_EXEC_PID: string;
		_: string;
		XDG_PICTURES_DIR: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		MOTD_SHOWN: string;
		VSCODE_INJECTION: string;
		HYPRLAND_CONFIG: string;
		HOME: string;
		XDG_PUBLICSHARE_DIR: string;
		LANG: string;
		LC_PAPER: string;
		HISTFILE: string;
		HYPRLAND_NO_SD_NOTIFY: string;
		LS_COLORS: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		PYTHONSTARTUP: string;
		MEMORY_PRESSURE_WATCH: string;
		STARSHIP_SHELL: string;
		STARSHIP_CACHE: string;
		WAYLAND_DISPLAY: string;
		STARSHIP_CONFIG: string;
		XDG_DOWNLOAD_DIR: string;
		GIT_ASKPASS: string;
		XDG_SEAT_PATH: string;
		XDG_MUSIC_DIR: string;
		XDG_TEMPLATES_DIR: string;
		INVOCATION_ID: string;
		SAVEHIST: string;
		MANAGERPID: string;
		CHROME_DESKTOP: string;
		STARSHIP_SESSION_KEY: string;
		QT_QPA_PLATFORM: string;
		UWSM_WAIT_VARNAMES: string;
		XDG_CACHE_HOME: string;
		INFOPATH: string;
		npm_lifecycle_script: string;
		NVM_DIR: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
		CLAUDE_CODE_SSE_PORT: string;
		XDG_SESSION_CLASS: string;
		XDG_DESKTOP_DIR: string;
		TERM: string;
		LC_IDENTIFICATION: string;
		npm_package_name: string;
		ZSH: string;
		PYTHON_BASIC_REPL: string;
		ZDOTDIR: string;
		USER: string;
		VSCODE_GIT_IPC_HANDLE: string;
		HOMEBREW_CELLAR: string;
		HYPRLAND_INSTANCE_SIGNATURE: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		NVM_CD_FLAGS: string;
		MOZ_ENABLE_WAYLAND: string;
		PAGER: string;
		LC_TELEPHONE: string;
		HOMEBREW_REPOSITORY: string;
		LC_MEASUREMENT: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		MANAGERPIDFDID: string;
		npm_config_user_agent: string;
		CUDA_DISABLE_PERF_BOOST: string;
		GPU_SETUP: string;
		XDG_STATE_HOME: string;
		npm_execpath: string;
		FC_FONTATIONS: string;
		XDG_RUNTIME_DIR: string;
		DEBUGINFOD_URLS: string;
		npm_package_json: string;
		LC_TIME: string;
		BUN_INSTALL: string;
		XDG_DOCUMENTS_DIR: string;
		APP2UNIT_TYPE: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		JOURNAL_STREAM: string;
		XDG_DATA_DIRS: string;
		GDK_BACKEND: string;
		PATH: string;
		__GLX_VENDOR_LIBRARY_NAME: string;
		GDK_SCALE: string;
		GBM_BACKEND: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		MAIL: string;
		UWSM_FINALIZE_VARNAMES: string;
		npm_node_execpath: string;
		LC_NUMERIC: string;
		OLDPWD: string;
		HYPRLAND_NO_SD_VARS: string;
		TERM_PROGRAM: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
