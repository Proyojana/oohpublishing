Ext.define('MyDesktop.store.PubNavTree', {
    	extend:'Ext.data.TreeStore',
		alias:'data.pubnavtree',
		
		root: {
        	expanded: true,        	
        	children: [
        	{ id:'newproject', text: "Create New Project",iconCls:'new_project', leaf: true },
				{ id:'editproject', text: "Edit Projects",iconCls:'edit_project', leaf: true },
			{ id:'projectmanagement', text: "Current Projects",iconCls:'current_project', leaf: true },
        		{ id:'projectmanagementCP', text: "Completed Projects",iconCls:'completed_project', leaf: true },
        		{
id:'archives', text: "Archives",iconCls:'archives', leaf: true
},
        	
			{
        		id:'projectreport', text: "Reports",iconCls:'smallReports', leaf: true 
			},
		
			]
    		}
			
		});
	