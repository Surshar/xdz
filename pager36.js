function fc2LoadMore(_lastPage) {

	var listArea     = '#entry_list';
	var trigger      = '#loadMoreBtn';
	var entryNumArea = '#entry_num';
	var entryArea    = '.entry_list';
	var entryNumBox  = '#entry_num_box';

	$(window).bind('load.fc2LoadMore', function() {
		var isLoading = false;
		var page = 1;
		var latPage = parseInt(_lastPage);
		var $listArea = $(listArea);
		var $trigger = $(trigger);
		var $entryNumBox = $(entryNumBox);
		var $entryNumArea = $(entryNumArea);
		var loading = function(flg) {
			isLoading = flg;
			$trigger.children(':first-child').toggle(flg);
		};
		var updateEntryNum = function() {
			if (!$entryNumArea) return false;
			$entryNumArea.text($(entryArea).length);
		};

		if (!latPage) {
			$entryNumBox.hide();
			$trigger.hide();
			return false;
		}

		updateEntryNum();

		if (_lastPage < 1) return false;
		if (!$listArea || !$trigger) return false;


		$trigger.bind('click.fc2LoadMore', function() {
			$.ajax({
				type: 'GET',
				url: location.href.substr(0, location.href.length - location.hash.length) + (location.search.length ? '&' : '?') + 'more&page=' + page++,
				dataType: 'html',
				timeout: 3000, // msec
				beforeSend: function(jqXHR, settings) {
					if (isLoading) return false;
					loading(true);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					--page;
				},
				success: function(response, textStatus, jqXHR) {
          
					$('<div>').html(response).appendTo($listArea);
					jQuery('article.entry_list.wrapper iframe').each(function(){
						jQuery(this).closest('div').remove();
					});
				},
				complete: function(jqXHR, textStatus) {
					if (page >= latPage) {
						$trigger.hide();
						$trigger.unbind('click.fc2LoadMore');
					}
					loading(false);
					updateEntryNum();
				}
			});
		});
	});
}
