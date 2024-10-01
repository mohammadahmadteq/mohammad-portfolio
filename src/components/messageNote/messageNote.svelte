<div class="sticky-note"></div>

<style>
	.sticky-note {
		width: 200px;
		height: 200px;
		background-color: #fffa65;
		padding: 20px;
		font-family: 'Arial', sans-serif;
		font-size: 16px;
		color: #333;
		position: relative;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
		transform: rotate(-3deg);
		border: 1px solid #e5e5e5;
	}

	.sticky-note:before {
		content: '';
		position: absolute;
		top: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 50px;
		height: 10px;
		background-color: #e0e0e0;
		border-radius: 2px;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
	}

	.sticky-note:after {
		content: '';
		position: absolute;
		bottom: -10px;
		right: -10px;
		width: 20px;
		height: 20px;
		background-color: rgba(0, 0, 0, 0.1);
		transform: rotate(45deg);
	}
</style>
