
interface IProps {
    onClickFn: any;
    styleClass: string;
    label:string;
}

const CustomButtom =  (props: IProps) => {
    return (
        <div style={{ marginBottom: '60px' }} > 
         <button onClick={ (e) => {  props.onClickFn(e) }} className={props.styleClass}> {props.label} </button>
        </div>
    );
};

export default CustomButtom;