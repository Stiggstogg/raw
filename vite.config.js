export default {
    base: './',                         // set the base path (otherwise it will not work on itch.io!)
    build: {
        chunkSizeWarningLimit: 1500,   // increase chunk size warning limit from 500 KiB to 1500 KiB as phaser is pretty big
        assetsInlineLimit: 0            // do not inline images, as it might lead to errors with phaser
    }
}