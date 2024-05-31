import React from "react";

function AddAppPropTable({rowCount}) {
    return rowCount > 0 && (<table className="table table-bordered table-sm">
                    <thead className="table-dark">
                      <tr>
                        <th><center>Property</center></th>
                        <th><center>Value</center></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Array.from({ length: rowCount }).map((_, index) => (
                          <tr key={index}>
                            <td className="p-0"><input type="text" className="form-control w-100" placeholder="name" required></input></td>
                            <td className="p-0"><input type="text" className="form-control w-100" placeholder="value" required></input></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>);
}

export default AddAppPropTable;