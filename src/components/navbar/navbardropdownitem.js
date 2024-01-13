'use client';

export default function NavBarDropDownItem(props){
    return (
        <div className={`p-2 hover:transition-all ${props.isSidebar ? 'hover:bg-white' : 'hover:bg-blue-300 ' + (props.isFirst ? 'rounded-t-lg' : (props.isLast ? 'rounded-b-lg' : ''))}`}>
            <a href={props.href} className="flex w-full h-full">
                {props.value}
            </a>
        </div>
    )
}