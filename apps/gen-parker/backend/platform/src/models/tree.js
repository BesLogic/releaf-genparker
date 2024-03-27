import { BadRequest } from "@gen-parker/shared-js/util";

export class Tree {

  /**
   * @param {string} treeId the identifier of which tree is being used
   * @param {number} treeNumber number of trees
   */
  constructor(treeId, treeNumber) {
    if (!treeId) throw new BadRequest('treeId is required');
    /**
     * @type {string}
     * @public
     * @readonly
     * @description the identifier of which tree is being used
     */
    this.treeId = treeId;

    if (!treeNumber) throw new BadRequest('treeNumber is required');
    /**
     * @type {number}
     * @public
     * @readonly
     * @description number of trees
     */
    this.treeNumber = treeNumber;
  }
}