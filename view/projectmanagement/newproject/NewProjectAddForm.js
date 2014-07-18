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
	requires:['MyDesktop.store.Customers','MyDesktop.store.Workflow','MyDesktop.store.Customers_team'],
  
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
    listeners: {
     	 afterrender: function(){
     	 //	alert("listen");
     	 	var currentForm = Ext.getCmp('newprojectaddform');     
       	  	
       	
			 currentForm.getForm().load({
   								 url: 'service/projects.php',
							     params: {
        						 	action:7
        						 	
							    },
							    success:function(form,action){
							    	
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){	
							    //	alert("failure");						    
							    	Ext.getCmp('job_code').setValue(action.result.message);
							    }
							
							});
     	}},
	initComponent:function(){
	/*	var ci = Ext.create('MyDesktop.store.State');
		ci.load({params:{action: 7}});
	    ci.loadPage(1);*/
	   	var client = Ext.create('MyDesktop.store.Customers');
		client.load({params:{action: 1}});
		 var team = Ext.create('MyDesktop.store.Customers_team');
		var workflow = Ext.create('MyDesktop.store.Workflow');
		workflow.load({params:{action: 1}});
		
		this.items= [
			{
			id:'teamsid',
			name: 'teamsid',
			hidden:true
			},
			
		{
			id:'job_code',
			fieldLabel: 'Job #',
			x:10,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
			id:'project_title',
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
			id:'hb_isbn',
			fieldLabel: 'HB ISBN',
			x:10,
			y:50,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
			id:'pb_isbn',
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
    		
    		id:'castoff_extent',
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
			id:'confirmed_extent',
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
			id:'manuscript',
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
			store:client,
			displayField: 'name',
			valueField: 'id',
			listeners : {
				change : function() {
					//var currentForm = this.up('newprojectaddform');
					var clientId = Ext.getCmp('project_client').getValue();
					team.load({params:{action:6,clientId:clientId}}); 
					workflow.load({params:{action:8,clientId:clientId}}); 
				}
			}
    	},
    	{   
    		xtype:'combo',
			id:'project_team',
			fieldLabel: 'Client Team',
			align:'center',
			x:360,
			y:320,
			width:320,
			store:team,
			displayField: 'name',
			valueField: 'id',
		
    	},
    	{   
    		xtype:'combo',
			id:'project_workflow',
			fieldLabel: 'Workflow',
			align:'center',
			x:710,
			y:320,
			width:320,
			store:workflow,
			displayField: 'workflow_name',
			valueField: 'workflow_id',
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
				var currentForm = this.up('newprojectaddform');
				var job_code = Ext.getCmp('job_code').getValue();
				var project_title = Ext.getCmp('project_title').getValue();
				var project_author= Ext.getCmp('project_author').getValue();
				var hb_isbn= Ext.getCmp('hb_isbn').getValue();
				var pb_isbn= Ext.getCmp('pb_isbn').getValue();
				
				var project_series = Ext.getCmp('project_series').getValue();
				var project_format = Ext.getCmp('project_format').getValue();
				var project_design= Ext.getCmp('project_design').getValue();
				var castoff_extent= Ext.getCmp('castoff_extent').getValue();
				var confirmed_extent= Ext.getCmp('confirmed_extent').getValue();
				
				var client_deadline = Ext.getCmp('client_deadline').getValue();
				var agreed_deadline = Ext.getCmp('agreed_deadline').getValue();
				var word_count= Ext.getCmp('word_count').getValue();
				var manuscript= Ext.getCmp('manuscript').getValue();
				var index_extent= Ext.getCmp('index_extent').getValue();
				
				var chapter_footer = Ext.getCmp('chapter_footer').getValue();
				var contain_colour = Ext.getCmp('contain_colour').getValue();
				var project_client= Ext.getCmp('project_client').getValue();
				var project_team= Ext.getCmp('project_team').getValue();
				var project_workflow= Ext.getCmp('project_workflow').getValue();
				
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/projects.php',
						method: 'POST',
						params : {action:5,job_code:job_code,project_title:project_title,project_author:project_author,hb_isbn:hb_isbn,pb_isbn:pb_isbn,project_series:project_series,
							project_format:project_format,project_design:project_design,castoff_extent:castoff_extent,confirmed_extent:confirmed_extent,client_deadline:client_deadline,
							agreed_deadline:agreed_deadline,word_count:word_count,manuscript:manuscript,index_extent:index_extent,chapter_footer:chapter_footer,
							contain_colour:contain_colour,project_client:project_client,project_team:project_team,project_workflow:project_workflow},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						//	currentForm.getForm().reset();
						///	Ext.getCmp('citygrid').getStore().reload();
						//	Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
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
				var currentForm = this.up('newprojectaddform');
				currentForm.getForm().reset();
			//	Ext.getCmp('citycode').setReadOnly(false);
			 	var currentForm = Ext.getCmp('newprojectaddform');     
       	  	
       	
			 currentForm.getForm().load({
   								 url: 'service/projects.php',
							     params: {
        						 	action:7
        						 	
							    },
							    success:function(form,action){
							    	
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){	
							    //	alert("failure");						    
							    	Ext.getCmp('job_code').setValue(action.result.message);
							    }
							
							});
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


