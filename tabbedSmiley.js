/**
 * Tabbed Smileys (TSm)
 *
 * @package TSm
 * @author emanuele
 * @license BSD http://opensource.org/licenses/BSD-3-Clause
 *
 * @version 0.1.2
 */

(function($, window, document) {
	'use strict';
	var tabs = {}, tab_btns = {};

		/**
		 * Create the button of a tab
		 */
		function createBtn(idx, target, text, cssclass)
		{
			tab_btns[idx] = $('<li id="' + idx + '" ' + (cssclass ? 'class="sceditor-tabs-' + cssclass + '"' : '') + ' />')
				.data('target', target);

			tab_btns[idx].click(function (e) {
				var cur_id = $(this).attr('id');
				e.preventDefault();

				$.each(tabs, function(idx, val) {
					$(tab_btns[idx]).removeClass('sceditor-tabs-active');
					$(this).removeClass('visible').addClass('hidden');

					if ($(this).attr('id') == cur_id + '-tab' && !tab_btns[idx].added)
						$('#sceditor-smileycontainer').after(tabs[idx]);
				});

				$(this).addClass('sceditor-tabs-active');
				$('#' + $(this).data('target')).removeClass('hidden').addClass('visible').find('img').each(function () {
					$(this).attr('src', $(this).attr('src-url'));
				});
			});

			tab_btns[idx].text(base._(text));

			return tab_btns[idx];
		}

		/**
		 * Create the image of an emoticon (with events)
		 */
		function buildEmoticon(code, emoticon) {
			if (emoticon === '')
				return false;
			else
				return $('<img />')
					.attr({
						'src-url': emoticon.url || emoticon,
						alt: code,
						title: emoticon.tooltip || emoticon
					})
					.click(function (e) {
						var start = '',
							end = '';

						if (base.opts.emoticonsCompat)
						{
							start = '<span> ';
							end   = ' </span>';
						}

						if (base.inSourceMode())
							base.sourceEditorInsertText(' ' + $(this).attr('alt') + ' ');
						else
							base.wysiwygEditorInsertHtml(start + '<img src="' + $(this).attr("src") + '" data-sceditor-emoticon="' + $(this).attr('alt') + '" />' + end);

						e.preventDefault();
					});
		}

		/**
		 * Attach the tabbed interface
		 */
		function addTabbed() {
			var $btn_tabs = null,
				$tabs = null;

			var emoticons = $.extend({}, base.opts.emoticons.dropdown),
				popup_exists = false,
				smiley_popup = '',
				$editor = $('#editor_toolbar_container'),
				content = $('<div class="sceditor-insertemoticon button" />');

			for (smiley_popup in base.opts.emoticons.popup)
			{
				popup_exists = true;
				break;
			}

			// For any smileys that go in the more popup
			if (popup_exists)
			{
				var emots = $.extend({}, base.opts.emoticons.popup);

				if ($btn_tabs === null)
				{
					var count = 0, ccount = 0;

					// On these two we build our system
					$btn_tabs = $('<ul class="sceditor-emot-head-tabs" />');
					$tabs = $('<ul class="sceditor-emot-tabs" />');

					$btn_tabs.append(createBtn('sceditor-smileycontainer-top', 'sceditor-smileycontainer', TabbedSmileyLang.base, 'active'));
					tabs['sceditor-smileycontainer-top'] = $('#sceditor-smileycontainer');

					$.each(emots, function (idx, val) {
						if (count == 0 || val == '')
						{
							// Prepare a new panel
							tabs['sceditor-tabs-' + count] = $('<div id="sceditor-tabs-' + count + '-tab" class="hidden" />');
							ccount = count;
							$btn_tabs.append(createBtn('sceditor-tabs-' + count++, 'sceditor-tabs-' + ccount + '-tab', TabbedSmileyLang.tabs.replace('{%d}', parseInt(count))));
						}

						tabs['sceditor-tabs-' + ccount].append(buildEmoticon(idx, val));
					});
					content.before($btn_tabs);

				$editor.find('.sceditor-insertemoticon').before($btn_tabs);
				}
			}
		}

	/**
	 * Mentioning plugin interface to SCEditor
	 *  - Called from the editor as a plugin
	 */
	$.sceditor.plugins.tabbedemotes = function() {
		var base = this;

		/**
		 * Initialize, called when sceditor starts and initializes plugins
		 */
		base.signalReady = function() {
			addTabbed();
		};
	};
})(jQuery, window, document);