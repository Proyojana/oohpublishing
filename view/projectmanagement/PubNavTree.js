Ext.define('MyDesktop.store.PubNavTree', {
    	extend:'Ext.data.TreeStore',
		alias:'data.pubnavtree',
		
		root: {
        	expanded: true,        	
        	children: [
        	{
        		id:'', text: "Dashboard",iconCls:'dashboard_icon', leaf: true 
			},
			
			{ id:'newproject', text: "Create New Project",iconCls:'', leaf: true },
			{ id:'projectmanagement', text: "Current Projects",iconCls:'', leaf: true },
        		{ id:'projectmanagementCP', text: "Completed Projects",iconCls:'', leaf: true },   			
			{
        		id:'projectreport', text:"Reports",iconCls:'smallReports', leaf: true 
			},
		
			]
    		}
			
		});
	