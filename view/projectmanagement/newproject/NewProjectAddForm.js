var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
var times = Ext.create('Ext.data.Store', {
        fields: ['format'],
        data : [
           {"format":"216 x 138"},
            {"format":"226 x 52"},
            {"format":"234 x 156"},
            {"format":"246 x 189"},
            {"format":"247 x 74"}
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.newproject.NewProjectAddForm' ,{
    extend: 'Ext.form.Panel',
    title:'Create New Project',
    alias : 'widget.newprojectaddform',
   		id:'newprojectaddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	//requires:['MyDesktop.store.State'],
  
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	initComponent:function(){
	/*	var ci = Ext.create('MyDesktop.store.State');
		ci.load({params:{action: 7}});
	    ci.loadPage(1);*/
		this.items= [
			{
			id:'teamsid',
			name: 'teamsid',
			hidden:true
			},
			
		{
			id:'jobid',
			fieldLabel: 'Job #',
			x:10,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
			id:'title',
			fieldLabel: 'Title',
			align:'center',
			x:360,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{
    		
    		id:'project_author',
			fieldLabel: 'Author',
			x:710,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
			id:'hb',
			fieldLabel: 'HB ISBN',
			x:10,
			y:50,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
			id:'pb',
			fieldLabel: 'PB ISBN',
			name: 'PB ISBN',
			align:'center',
			x:360,
			y:50,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{
    	
    		id:'project_series',
			fieldLabel: 'Series',
			x:10,
			y:90,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
    		xtype:'combo',
			id:'project_format',
			fieldLabel: 'Format',
			x:360,
			y:90,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			store:times,
			displayField:'format'
    	},
    	{
			id:'project_design',
			fieldLabel: 'Design',
			align:'center',
			x:710,
			y:90,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{
    		
    		id:'new_project_client_deadline',
			fieldLabel: 'Cast-off extent',
			x:10,
			y:130,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			xtype:'numberfield',
			minValue: 0,
    	},
    	{
    		xtype:'numberfield',
    		minValue: 0,
			id:'confired_extent',
			fieldLabel: 'Confirmed extent',
			x:360,
			y:130,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
    		xtype:'datefield',
			id:'client_deadline',
			fieldLabel: 'Client deadline',
			align:'center',
			x:10,
			y:170,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{
    		xtype:'datefield',
    		id:'agreed_deadline',
			fieldLabel: 'Agreed deadline',
			x:360,
			y:170,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
        // Fieldset in Column 1 - collapsible via toggle button
       xtype:'fieldset',
        layout: 'hbox',
        title: 'For Indexing',
             x:0,
			y:210,
			
        items :[{
    		xtype:'numberfield',
    		minValue: 0,
    		
    		id:'word_count',
			fieldLabel: 'Word count',
			x:10,
			y:240,
			width:320,
			labelWidth:140,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	
		{  
			xtype:'numberfield',
			id:'menuscript',
			margin:'0 0 0 28',
			minValue: 0,
			fieldLabel: 'Manuscript pages',
			align:'center',
			x:400,
			y:240,
			labelWidth:140,
			width:320,
    	},
    	{  
    		xtype:'numberfield',
    		allowNegative : false,
    		minValue: 0,
    		margin:'0 0 0 36',
			id:'index_extent',
			fieldLabel: 'Expect Index extent',
			align:'center',
			x:750,
			labelWidth:140,
			y:240,
			width:320,
		
    	},]
    },
    	
    /*	{
    		xtype: 'displayfield',
    		fieldLabel: 'For Indexing',
    		width:1,
    		x:10,
			y:210,
			labelWidth:470,
             labelStyle: 'font-size: 13px;font-weight: bold;',
    	},
			{
    		xtype:'numberfield',
    		minValue: 0,
    		id:'word_count',
			fieldLabel: 'Word Count',
			x:10,
			y:240,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	
		{  
			xtype:'numberfield',
			id:'menuscript',
			minValue: 0,
			fieldLabel: 'Manuscript Pages',
			align:'center',
			x:360,
			y:240,
			width:320,
    	},
    	{  
    		xtype:'numberfield',
    		allowNegative : false,
    		minValue: 0,
			id:'index_extent',
			fieldLabel: 'Expect Index Extent',
			align:'center',
			x:710,
			y:240,
			width:320,
		
    	},
    	*/
    	{  
    		xtype: 'checkboxfield',
			id:'chapter_footer',
			fieldLabel: 'Chapter footer required',
			align:'center',
			x:10,
			y:280,
			width:320,
    	},
    	{  
    		xtype: 'checkboxfield',
			id:'contain_colour',
			fieldLabel: 'Contains colour',
			align:'center',
			x:360,
			y:280,
			width:320,
		
    	},
    	{  
    		xtype:'combo',
			id:'project_client',
			fieldLabel: 'Client',
			align:'center',
			x:10,
			y:320,
			width:320,
    	},
    	{   
    		xtype:'combo',
			id:'project_team',
			fieldLabel: 'Client Team',
			align:'center',
			x:360,
			y:320,
			width:320,
		
    	},
    	{   
    		xtype:'combo',
			id:'project_workflow',
			fieldLabel: 'Workflow',
			align:'center',
			x:710,
			y:320,
			width:320,
		
    	},
    	
    	
    		
		{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	    id:'add_team',
			x:350,
			y:440,
			width:75,
			handler: function (){				
				var currentForm = this.up('cityform');
				var city_code = Ext.getCmp('citycode').getValue();
				var city_name = Ext.getCmp('cityname').getValue();
				var city_state= Ext.getCmp('cstateid').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/City.php',
						method: 'POST',
						params : {action:5,city_code:city_code,city_name:city_name,city_state:city_state},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('citygrid').getStore().reload();
							Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
			}
	  	},
		
		{
			xtype: 'button',
		  	text: 'Edit',
		  	iconCls: 'editClass',
		  	id:'edit_team',
			align:'center',
			x:450,
			y:440,
			width:75,
			handler: function ()
			   {
			   	var currentForm = this.up('cityform');
				var city_code = Ext.getCmp('citycode').getValue();
				var city_id = Ext.getCmp('cityid').getValue();
				var city_name = Ext.getCmp('cityname').getValue();
				var city_state= Ext.getCmp('cstateid').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/City.php',
						method: 'POST',
						params : {action:4,city_id:city_id,city_code:city_code,city_name:city_name,city_state:city_state},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('citygrid').getStore().reload();
							Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
			}
	  	},
		
	  	{
			xtype: 'button',
		  	text: 'Reset',
		  	iconCls: 'button_reset',
		  	id:'reset_team',
			x:550,
			y:440,
			width:75,
			handler: function (){
				var currentForm = this.up('cityform');
				currentForm.getForm().reset();
				Ext.getCmp('citycode').setReadOnly(false);
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


