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
		tab_btns = {},
		editor,
		$btn_tabs;

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

		tab_btns[idx].text(editor._(text));

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
				let start = '',
					end = '';

				if (editor.opts.emoticonsCompat)
				{
					start = '<span> ';
					end = ' </span>';
				}

				if (editor.inSourceMode())
				{
					editor.sourceEditorInsertText(' ' + $(this).attr('alt') + ' ');
				}
				else
				{
					editor.wysiwygEditorInsertHtml(start + '<img src="' + $(this).attr("src") + '" data-sceditor-emoticon="' + $(this).attr('alt') + '" />' + end);
				}

				e.preventDefault();
			});
	}

	/**
	 * Attach the tabbed interface
	 */
	function addTabbed()
	{
		// For any smileys that go in the popup
		if (editor.opts.emoticons.hasOwnProperty('popup'))
		{
			let emots = {},
				tabName = '',
				count = 0,
				ccount = 0;

			// On this we build our system
			Object.assign(emots, editor.opts.emoticons.popup);
			$btn_tabs = $('<ul class="sceditor-emot-head-tabs" />');

			// Start with the Base tab
			$btn_tabs.append(createBtn('sceditor-smileycontainer-top', 'sceditor-smileycontainer', TabbedSmileyLang.base, 'active'));
			tabs['sceditor-smileycontainer'] = $('#sceditor-smileycontainer');

			// Each row is a tab, starting with "base" which holds the smiles not in "more"
			$.each(emots, function (idx, val) {
				// Start of a smiley row, starts a new tab
				if (count === 0 || idx === '-' + ccount)
				{
					// Prepare a new tab
					tabs['sceditor-tabs-' + count] = $('<div id="sceditor-tabs-' + count + '-tab" class="hidden" />');
					ccount = count;
					tabName = TabbedSmileyLang.tabs.replace('{%d}', count + 1);

					$btn_tabs.append(createBtn('sceditor-tabs-' + count++, 'sceditor-tabs-' + ccount + '-tab', tabName));
				}

				// Add the smiley to the current tab
				tabs['sceditor-tabs-' + ccount].append(buildEmoticon(idx, val));
			});
		}
	}

	/**
	 * Waits for an element to appear in the DOM and then triggers
	 *
	 * @param {string} selector wait for this element to show up in DOM
	 * @returns {Promise}
	 */
	function waitForElm(selector) {
		return new Promise(resolve =>
		{
			if (document.querySelector(selector))
			{
				return resolve(document.querySelector(selector));
			}

			const observer = new MutationObserver(mutations =>
			{
				if (document.querySelector(selector))
				{
					resolve(document.querySelector(selector));
					observer.disconnect();
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
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
		base.init = function() {
			editor = this;

			// Create/Insert the tabs as soon as the DOM supports it (e.g. editor has created the smiley div)
			// Could use base.signalReady but that is taking over 10seconds to fire
			waitForElm('#sceditor-smileycontainer').then((elm) => {
				// Build those beautiful tabs
				addTabbed();

				let $editor = $('#editor_toolbar_container'),
					content = $('<div class="sceditor-insertemoticon button" />');

				content.before($btn_tabs);
				$editor.find('.sceditor-insertemoticon').before($btn_tabs);
			})
		};
	};
})(jQuery, window, document);
