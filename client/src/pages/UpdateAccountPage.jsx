import { useEffect } from 'react'
import { useAccounts } from '../context/accountContext'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateAccountPage() {
    const { updateAccount, getAccount } = useAccounts();
    const {register, handleSubmit, setValue} = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            if (id) {
                await updateAccount(id, data);
            }
            navigate('/api/v1/home/all');
        } catch (error) {
            console.error('Error updating account:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const account = await getAccount();
                    setValue("name", account.name);
                    setValue("email", account.email);
                } else {
                    setValue("name", '');
                    setValue("email", '');
                }
                
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
    <div class="col-md-4 mx-auto">
    <div class="card text-center">
        <div class="card-header">
            <h4>Account Information</h4>
        </div>
        <div class="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="mb-3">
                    <input type="text" name="name" class="form-control" {...register("name", { required: true })} autoFocus/>
                </div>
                <div class="mb-3">
                    <input type="text" name="email" class="form-control" {...register("email", { required: true })}/>
                </div>
                <div class="d-flex gap-2">
                    <button type='submit' class="btn-primary w-100"> Update Account </button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default UpdateAccountPage