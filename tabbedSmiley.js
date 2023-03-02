/**
 * Tabbed Smileys (TSm)
 *
 * @package TSm
 * @author emanuele
 * @license BSD http://opensource.org/licenses/BSD-3-Clause
 *
 * @version 0.2.0
 */

(function($, window, document){
	'use strict';

	let tabs = {},
		tab_btns = {};

	/**
	 * Create the button of a tab
	 */
	function createBtn(idx, target, text, cssclass, callback)
	{
		tab_btns[idx] = $('<li id="' + idx + '" ' + (cssclass ? 'class="sceditor-tabs-' + cssclass + '"' : '') + ' />')
			.data('target', target);

		if (callback)
		{
			tab_btns[idx].click(function (e)
			{
				e.preventDefault();
				callback(e);
			});
		}
		else
		{
			tab_btns[idx].click(function (e)
			{
				let cur_id = $(this).attr('id');

				e.preventDefault();

				$.each(tabs, function (idx, val)
				{
					$(tab_btns[idx]).removeClass('sceditor-tabs-active');
					$(this).removeClass('visible').addClass('hidden');

					if ($(this).attr('id') === cur_id + '-tab' && !tab_btns[idx].added)
					{
						$('#sceditor-smileycontainer').after(tabs[idx]);
					}
				});

				$(this).addClass('sceditor-tabs-active');
				$('#' + $(this).data('target')).removeClass('hidden').addClass('visible').find('img').each(function () {
					$(this).attr('src', $(this).attr('src-url'));
				});
			});
		}

		tab_btns[idx].text(base._(text));

		return tab_btns[idx];
	}

	/**
	 * Create the image of an emoticon (with events)
	 */
	function buildEmoticon(code, emoticon)
	{
		if (emoticon === '')
		{
			return false;
		}

		return $('<img />')
			.attr({
				'src-url': emoticon.url || emoticon,
				alt: code,
				title: emoticon.tooltip || emoticon
			})
			.on('click', function (e)
			{
				var start = '',
					end = '';

				if (base.opts.emoticonsCompat)
				{
					start = '<span> ';
					end = ' </span>';
				}

				if (base.inSourceMode())
				{
					base.sourceEditorInsertText(' ' + $(this).attr('alt') + ' ');
				}
				else
				{
					base.wysiwygEditorInsertHtml(start + '<img src="' + $(this).attr("src") + '" data-sceditor-emoticon="' + $(this).attr('alt') + '" />' + end);
				}

				e.preventDefault();
			});
	}

	/**
	 * Attach the tabbed interface
	 */
	function addTabbed()
	{
		let $btn_tabs = null,
			popup_exists = base.opts.emoticons.hasOwnProperty('popup'),
			$editor = $('#editor_toolbar_container'),
			content = $('<div class="sceditor-insertemoticon button" />');

		// For any smileys that go in the more popup
		if (popup_exists)
		{
			let emots = $.extend({}, base.opts.emoticons.popup),
				tabName = '',
				count = 0,
				ccount = 0;

			// On this we build our system
			$btn_tabs = $('<ul class="sceditor-emot-head-tabs" />');

			// Start with the Base tab
			$btn_tabs.append(createBtn('sceditor-smileycontainer-top', 'sceditor-smileycontainer', TabbedSmileyLang.base, 'active'));
			tabs['sceditor-smileycontainer'] = $('#sceditor-smileycontainer');

			// Each row is a tab, starting with "base"
			$.each(emots, function (idx, val) {
				// Start of a smiley row, starts a new tab
				if (count === 0 || idx === '-' + ccount)
				{
					// Prepare a new panel
					tabs['sceditor-tabs-' + count] = $('<div id="sceditor-tabs-' + count + '-tab" class="hidden" />');
					ccount = count;
					tabName = TabbedSmileyLang.tabs.replace('{%d}', count + 1);

					$btn_tabs.append(createBtn('sceditor-tabs-' + count++, 'sceditor-tabs-' + ccount + '-tab', tabName));
				}

				// A smiley, add it to the current tab
				tabs['sceditor-tabs-' + ccount].append(buildEmoticon(idx, val));
			});

			content.before($btn_tabs);
			$editor.find('.sceditor-insertemoticon').before($btn_tabs);
		}
	}

	/**
	 * Plugin interface to SCEditor
	 *  - Called from the editor as a plugin
	 */
	$.sceditor.plugins.tabbedemotes = function() {
		let base = this;

		/**
		 * Initialize, called when sceditor starts and initializes plugins
		 */
		base.signalReady = function() {
			addTabbed();
		};
	};
})(jQuery, window, document);
