import _ from "lodash"
import React from "react"
import { DropdownChoice } from "../types"

interface DropdownProps {
    choices: DropdownChoice[]
    selectChoice: (choice: number) => void
}

const Dropdown: React.FunctionComponent<DropdownProps> = (props) => {
    const gbChoices = _.groupBy(props.choices, "group")
    const groups = Object.keys(gbChoices).sort()
    return(
        <div>
            <div className="text">Select Puzzle Size</div>
            <select id="select-with-optgroups-raw" onChange={e => props.selectChoice(Number(e.target.value))}>
                {
                    groups.map(group =>
                        <React.Fragment key={group}>
                            <optgroup label={group}>
                            { gbChoices[group].map(item =>
                                <option  key={`${item.value}`} value={item.value}>{item.label}</option>)
                            }
                            </optgroup>
                        </React.Fragment>,
                    )
                })}
            </select>
        </div>
    )
}

export default Dropdown
