var img_rotate = [];
function rotation_start( id,start)
{
	if( img_rotate[id] )
	{
		(function($)
		{
			var el = $( '#'+id );
			var arr = el.attr( 'data-arr' );
			arr = eval("("+arr+")");
			var len = arr.length;
			var img_to_load = arr[start];
			el.attr( 'src',img_to_load );
			var next_img = ( start+1 )%len;
			console.log( "rotation_start('"+id+"',"+next_img+")" );
			setTimeout( "rotation_start('"+id+"',"+next_img+")",600 );
		})(jQuery);
	}
}
function rotation_stop( id )
{
	img_rotate[id] = false;
	(function($)
	{
		var el = $( '#'+id );
		var arr = el.attr( 'data-arr' );
		arr = eval("("+arr+")");
		el.attr( 'src',arr[0] );
	})(jQuery);
}


(function($)
{

	$( '.img-rotator' ).hover(function()
	{
		var el = $(this);
		var id = el.attr( 'id' );
		img_rotate[id] = true;
		rotation_start( id,1 );
	});
	$( '.img-rotator' ).mouseout(function()
	{
		var el = $(this);
		var id = el.attr( 'id' );
		rotation_stop( id );
	});
})(jQuery);