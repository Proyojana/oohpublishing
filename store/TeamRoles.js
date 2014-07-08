 Ext.define('MyDesktop.store.TeamRoles', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.TeamRoles',
        proxy: {
    		type:'ajax',
			url: 'service/team_roles.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:3},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	