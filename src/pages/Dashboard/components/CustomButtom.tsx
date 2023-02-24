
interface IProps {
    isProcessing: boolean;
    onClickFn: any;
}

const CustomButtom =  (props: IProps) => {

    const executeButtonClass = !props.isProcessing? 'Dash-button-Active' : 'Dash-button-Inactive';
    const executeButtonLabel = !props.isProcessing ? 'Execute Best Suitability Score' : 'Please wait...';
    
    return (
        <div style={{ marginBottom: '60px' }} > 
         <button onClick={ (e) => {  props.onClickFn(e) }} className={executeButtonClass}> {executeButtonLabel} </button>
        </div>
    );
};

export default CustomButtom;