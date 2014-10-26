var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.editproject.schedule.emailAuthor' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.emailAuthor',
    id:'emailAuthor',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
           },
	height:520,
	frame:true,
	defaults: {
        labelWidth: 90,
 },

    defaultType: 'textfield',
    initComponent:function(){
    	
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
							id:'authorFrom',
							width:700
						},{
							xtype:'textfield',
							fieldLabel:'To',
							x:10,
							y:40,
							id:'authorEmail',
							width:700,
							allowBlank: false,
							afterLabelTextTpl: required,
						},
						{
							xtype:'textfield',
							fieldLabel:'Cc',
							id:'authorCc',
							x:10,
							y:70,
							width:700
						},
						{
							xtype:'tinymce_textarea',
							tinyMCEConfig: tinyCfg1,    
							fieldLabel:'Message',
							id:'authorMessage',
							x:10,
							y:100,
							width:700,
							height:300
						},
						
							{
      	 xtype: 'filefield',
      	 //vtype:'filei', 
         x:10,
        // msgTarget: 'under',
         //acceptSize: 1024,
         y:410,
         width:280,
         name: 'file',
         id:'file',
        // anchor: '27%',
        fieldLabel: 'Attach Files',
        buttonText: 'Select a File...'},
							
					
					{
            xtype:'button', 
            id:'save'  ,        
            text: 'Send Email',  
                 
            x:210,
		    y:440,
		    width:100,
            handler: function(){ 
            	 var form = this.up('emailAuthor').getForm();               	
               var author_to=Ext.getCmp('authorEmail').getValue().toString();
								
								var author_message=Ext.getCmp('authorMessage').getValue().toString();
								
								var conn = new Ext.data.Connection();
							 form.submit({    
									url : 'service/emailTemplate.php',
									method : 'POST',
									params : {
										action : 4,
										//html : html,
										author_to:author_to,
										
										author_message:author_message
										
									},
									success : function(response) {
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Message', obj.message);
									//	email_author.close(); 
									},
								});
               
            },
       
       
    
      },
						]
					
		this.callParent();
	}
     
}); 


