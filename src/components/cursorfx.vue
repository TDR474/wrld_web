<template>
  <div>

      <cursor-fx ref="cursor"  />

  </div>
</template>


<script>



        export default {
          name: 'CursorFx',
            mounted() {

                // start it, on mounted, or wherever you want
                this.$refs.cursor.start();

            },
            methods: {
                others() {

                    // destroy
                    this.$refs.cursor.destroy();

                    //-> refresh automate: `destroy()` and `start()`
                    this.$refs.cursor.refresh();

                },
            }
        };
    </script>


<style lang ="scss">
:root {
	
	font-size: 16px;
	
}

body {
	
	overflow: hidden;
	background-color: #1e1f26;
	color: white;
	line-height: 1.5;
	
}

#app {
	
	.container {
		
		display: flex;
		flex-direction: row;
		flex: 0 1 100%;
		width: 100%;
		height: 100vh;
		max-width: 1024px;
		margin: 0 auto;
		text-align: center;
		justify-content: center;
		align-items: center;
		
		.w-full { width: 100%; }
		
		.button {
			
			display: block;
			
			margin: 8px auto;
			min-width: 209px;
			will-change: auto;
			text-decoration: none;
			transition: all .3s cubic-bezier(.455,.03,.515,.955);
			border-radius: 3px;
			border-width: 0;
			color: #fff;
			padding: 16px 24px;
			appearance: none;
			background-image: linear-gradient(90deg,#cb2d3e,#ef473a);
			background-position: left center;
			
			&:hover {

					background-position: right center;

			}
			
		}

	}

}
</style>