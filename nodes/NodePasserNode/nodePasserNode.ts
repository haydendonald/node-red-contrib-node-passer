import * as NodeRED from "node-red";
import { NodePasserNodeConfig } from "./nodePasserNodeConfig";


export = function NodePasserNode(RED: NodeRED.NodeAPI) {
    function register(this: NodeRED.Node, config: NodePasserNodeConfig) {
        RED.nodes.createNode(this, config);

        let originalMsg: any = null;
        const node = this;

        node.on("input", (msg: any) => {

            //If we don't have a original message yet, send it to the annoying node, otherwise it's a response
            if (originalMsg == null) {
                originalMsg = msg;
                node.send([Object.assign({}, msg), null]);
            }
            else {
                node.send([null, { ...msg, originalMsg }]);
                originalMsg = null;
            }

        });
    }

    RED.nodes.registerType("node-passer-node", register);
}