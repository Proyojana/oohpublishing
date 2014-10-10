var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.editproject.schedule.emailVendor' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.emailVendor',
    id:'emailVendor',
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
							id:'vendorFrom',
							fieldLabel:'From',
							width:700
						},{
							xtype:'textfield',
							fieldLabel:'To',
							id:'vendorEmail',
							x:10,
							y:40,
							width:700,
							allowBlank: false,
							afterLabelTextTpl: required,
						},
						{
							xtype:'textfield',
							fieldLabel:'Cc',
							x:10,
							y:70,
							width:700
						},
						{
							xtype:'textarea',
							fieldLabel:'Message',
							id:'vendorMessage',
							x:10,
							y:100,
							width:700,
							height:200
						},

						]
					
		this.callParent();
	}
     
}); 


