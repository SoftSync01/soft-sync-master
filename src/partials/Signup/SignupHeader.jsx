import {Link} from 'react-router-dom';
import Icon from '../../images/Soft-Sync-logo.png';


export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
            <img src={Icon} width="200" height="200" alt="Icon 01" />
        </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 mt-5">
                {paragraph}{' '}
                <Link to={linkUrl} className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300">
                {linkName}
                </Link>
            </p>
        </div>
    )
}