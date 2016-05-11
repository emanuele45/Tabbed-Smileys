<?php
/**
 * Tabbed Smileys (TSm)
 *
 * @package TSm
 * @author emanuele
 * @license BSD http://opensource.org/licenses/BSD-3-Clause
 *
 * @version 0.1.2
 */

function tabbedSmiley($editorId)
{
	global $context, $txt;

	$context['controls']['richedit'][$editorId]['plugin_addons'][] = 'tabbedemotes';
	loadJavascriptFile('tabbedSmiley.js');
	loadCSSFile('tabbedSmiley.css');
	loadLanguage('TabbedSmiley');
	addJavascriptVar(array(
		'TabbedSmileyLang' => '{
			base: ' . JavaScriptEscape($txt['tabbedSmiley_base']) . ',
			tabs: ' . JavaScriptEscape($txt['tabbedSmiley_tabs']) . '
		}',
	), false);
}