var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.currentprojects.Production_html_form' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.production_html_form',
   		id:'production_html_form',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	defaults: {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		var customers = Ext.create('MyDesktop.store.Reports');
		customers.load({
			params: {
				action: 2
			}
		});
		   	var tinyCfg1 = {
		// General options
		theme : "advanced",

		skin: "extjs",
    inlinepopups_skin: "extjs",
		
    // Original value is 23, hard coded.
    // with 23 the editor calculates the height wrong.
    // With these settings, you can do the fine tuning of the height
    // by the initialization.
    theme_advanced_row_height: 27,
    delta_height: 1,
    
    schema: "html5",
    
    plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist,spellchecker,mysave",
   
		spellchecker_languages : "+English=en",
		tools:"inserttable",
		extended_valid_elements : "iframe[src|frameborder|style|scrolling|class|width|height|name|align]",
		
    
		// Example content CSS (should be your site CSS)
		content_css : "contents.css"
		};
		tinymce.init({
		    plugins: "table",
		    tools: "inserttable",
		             
		});
		this.items = [
			           {
							xtype : 'textfield',
							x : 10,
							y : 10,
							fieldLabel:'From',
							id:'production_html_from',
							width:700
						},{
							xtype:'combo',
							hideTrigger: true,
							fieldLabel:'To',
							multiSelect:true,
							id:'production_html_to',
							x:10,
							y:40,
							store:customers,
							
							triggerAction:'all',
							displayField:'mail',
							queryMode: 'local',
							width:700,
							allowBlank: false,
							afterLabelTextTpl: required,
						},
						{
							xtype:'textfield',
							fieldLabel:'Cc',
							//multiSelect:true,
							id:'production_html_cc',
							x:10,
							y:70,
							//store:customers,
							/*ddReorder: true,
							//typeAhead:true,
							triggerAction:'all',
							displayField:'mail',*/
							width:700
						},
						{
							xtype:'tinymce_textarea',
							tinyMCEConfig: tinyCfg1,
							fieldLabel:'Message',
							id:'production_html_message',
							x:10,
							y:100,
							width:700,
							height:400
						},

						]
					
		this.callParent();
	}
     
}); 


