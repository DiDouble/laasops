vue_data.designer_logic_data = {
    editor: null,
    cur_writing: {
        id: "",
    },
};

async function init_designer_logic_data_file_view() {
    const editor_ta = document.getElementById("code");
    if (!editor_ta) {
        setTimeout(init_designer_logic_data_file_view, 1000);
        return;
    }
    vue_data.designer_logic_data.editor = CodeMirror.fromTextArea(editor_ta, {
        lineNumbers: true,
        indentUnit: 4,
        styleActiveLine: true,
        matchBrackets: true,
        mode: {
            name: "python",
            version: 3,
            singleLineStringErrors: false
        },
        lineWrapping: true,
        theme: 'monokai',
    });
    vue_data.designer_logic_data.editor.setOption("extraKeys", {
        Tab: function (cm) {
            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection(spaces);
        },
        "F11": function (cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function (cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        },
        'Ctrl-S': function () {
            update_designer_logic_data();
        }
    });
    query_designer_logic_data();
}

async function query_designer_logic_data() {
    try {
        const data_struct = {"did": vue_data.designer_logic_directory.cur_selected.id};
        // query data_struct from distribution
        const net_request_result = await do_execute_sql({
            "sql": `
                select id, file from designer_logic_data where did = %(did)s
                `,
            "parameters": data_struct,
        });
        if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
        const data = net_request_result.data[0];
        vue_data.designer_logic_data.cur_writing.id = data['id'];
        vue_data.designer_logic_data.editor.setValue(data['file']);
        component.$Message.success('query success');
    } catch (e) {
        console.log(e);
        component.$Message.error(e.response.data);
    }
}

async function update_designer_logic_data() {
    try {
        const data_struct = {
            "id": vue_data.designer_logic_data.cur_writing.id,
            "file": vue_data.designer_logic_data.editor.getValue(),
        };
        console.log(data_struct);
        // query data_struct from distribution
        const net_request_result = await do_execute_sql({
            "sql": `
                update designer_logic_data set file = %(file)s where id = %(id)s
                `,
            "parameters": data_struct,
        });
        if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
        component.$Message.success('update success');
    } catch (e) {
        console.log(e);
        component.$Message.error(e.response.data);
    }
}
