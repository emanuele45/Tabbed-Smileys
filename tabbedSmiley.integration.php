<?php
/**
 * Tabbed Smileys (TSm)
 *
 * @package TSm
 * @author emanuele
 * @license BSD http://opensource.org/licenses/BSD-3-Clause
 *
 * @version 0.1.1
 */

function tabbedSmiley($editorId)
{
	global $context;

	$context['controls']['richedit'][$editorId]['plugin_addons'][] = 'tabbedemotes';
	loadJavascriptFile('tabbedSmiley.js');
	loadCSSFile('tabbedSmiley.css');
}