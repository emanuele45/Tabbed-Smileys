Tabbed-Smileys
==============

The mod adds a "tabbed interface" to the post form. The smileys are organized in "tabs": the first tab contains all the smileys configured to appear in the post form, the "additional tabs" are defined based on the number of rows of smileys present in the popup (one row = one tab). You can add new rows of smileys from the admin panel, in **set smiley order**.<br />
With this mod it is possible to use all the available smileys without leave the posting browser window to reach the popup and keep low the number of smileys shown over the post form.

If you want to help, feel free!<br />
The mod is now available at github:<br />
https://github.com/emanuele45/Tabbed-Smileys<br />
with a brand now BSD license attached to it! :P

---------------------------------------

<span style="color: red">**NOTE:** version 0.3.99b is a BETA version!</span><br />
In this version I added the possibility to move (almost) all the elements of the posting interface into "tabs". It means that the formatting buttons, the attachments, the "other settings" are all moved on top of the post area each in a separated tab.<br />
Once installed you will find a new drop down box in *admin > Forum > Posts and Topics > Post Settings* with 3 options:

* Completely off (i.e. the classic SMF interface)
* Only smileys in tabs (i.e. the usual behaviour of the mod, only the smiley are put in a tab-like interface)
*All posting elements in tabs (i.e. the behaviour described just above)

Once selected the last option, a new checkbox will appear giving the possibility to chose to show the smileys' tabs in a separated row.<br />
**It _should_ work, but I didn't test it that much, so feel free to use it, but be ready to face problems. ;)**<br />
That said: I wait your feedback: is it useful? Is it useless? Feel free to test it and report problems or suggestions to improve it!<br />
_The changes affect only SMF 2.0_, I won't bring them to SMF 1.1.x.

---------------------------------------

**Important note for 1.1.x users**
To install the mod on SMF 1.1.15 and newer versions, please use the [Version Emulate](http://custom.simplemachines.org/mods/index.php?mod=2113) mod.

**Configuration**
The number of tabs is defined by the number of rows of smileys in the popup: every row corresponds to a tab.<br />
[![new row](http://img253.imageshack.us/img253/9926/newrow.th.png)](http://img253.imageshack.us/i/newrow.png/)
Doing like in the picture will create a third tab: the "basic" (with all the smileys in the post form), the first line of the popup (the :'( in the picture) and the newly added.
It's possible to change the tab a smiley belongs to by changing the position both in "edit smileys" or in "set smiley order".
It's also possible to define a custom name for each tab and change the css style directly in the admin panel, section "set smiley order".

[b]Change log[/b]
[list]
[li][u]0.3.7[/u]: fixed utf8, update to SMF versions 1.1.14 and 2.0[/li]
[li][u]0.3.6[/u]: [list][li]fixed a bug for SMF 2.0 stopping js execution in some situations and bad behaviour with WYSIWYG editor (i.e. smiley not working...). Many thanks to [url=http://www.simplemachines.org/community/index.php?topic=417533.msg2978622#msg2978622]abraamz[/url] for reporting and support in beta testing![/li][li]added polish UTF-8 translation (thanks to [url=http://www.simplemachines.org/community/index.php?topic=417533.msg2969650#msg2969650]becometa[/url]) and english-british ISO/UTF-8 and english and italian UTF-8. [b]Note:[/b] since I have always problems with characters encoding there I expect problems here too... :P). Thanks [url=http://www.simplemachines.org/community/index.php?topic=417533.msg2969652#msg2969652]Arantor[/url] for the hint.[/li][/list][/li]
[li][u]0.3.5[/u]: fixed the problem of loading tabs only when used for SMF 2.0 (I hope)[/li]
[li][u]0.3.4[/u]: removed "on demand" loading of tabs content for SMF 2.0 due to a bug reported by [url=http://www.simplemachines.org/community/index.php?topic=417533.msg2968622#msg2968622]RAULVK[/url][/li]
[li][u]0.3.3[/u]: fixed a bug with SMF 2.0 and IE (double "more" button) [url=http://www.simplemachines.org/community/index.php?topic=417533.msg2965693#msg2965693]reported by Rifugio[/url] (thanks!)[/li]
[li][u]0.3.2[/u]: now the tabs' content is loaded only "on demand"; added an option to hide the "more" button/link[/li]
[li][u]0.3.1[/u]: updated for SMF 1.1.13 and SMF 2.0 RC5[/li]
[li][u]0.3.0[/u]: improved flexibility with the possibility to decide which smiley should go in which tab, assign names to the tabs and change the css style[/li]
[li][u]0.2.3[/u]: initial release particular behaviour: by default the number of tabs is determined by the number of smileys in the post form but it can also be defined in the Smiley and Message Icons settings page of the admin panel.[/li]
[/list]
