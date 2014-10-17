var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.editproject.schedule.emailAuthor' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.emailAuthor',
    id:'emailAuthor',
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
							fieldLabel:'authorCc',
							x:10,
							y:70,
							width:700
						},
						{
							xtype:'textarea',
							fieldLabel:'Message',
							id:'authorMessage',
							x:10,
							y:100,
							width:700,
							height:200
						},

						]
					
		this.callParent();
	}
     
}); 


