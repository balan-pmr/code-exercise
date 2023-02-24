
interface IProps {
    classStyle: string;
    label: string;
    onClickFn: any;
}

const CustomButtom =  (props: IProps) => {
    return (
        <div style={{ marginBottom: '60px' }} > 
            <p onClick={() => { props.onClickFn() }} className={props.classStyle}> {props.label}  </p>
        </div>
    );
};

export default CustomButtom;