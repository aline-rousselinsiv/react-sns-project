import "../css/posts.css";
import { Pen, Soup, MapPin } from 'lucide-react';

function Posts ({children}) {
    return <>
        <div className="postContainer">
            {children}
            <div className="postElements">
                <div className="titleSection">
                    <div ><Pen size={35} /></div>
                    <div className="title">A romantic escapade</div>
                    <div className="tags">romantic</div>
                    <div className="tags">french</div>
                </div>
                <div className="locationSection">
                    <div ><Soup size={15} /></div>
                    <div className="restaurantName">Maison de Paris</div>
                    <div ><MapPin size={15} /></div>
                    <div className="restaurantAddr">33-4 Supyo-ro 28-gil, Jongno District, Seoul</div>
                </div>
                <div className="content">
                    If you’re looking for the perfect place for a date, just go to Maison de Paris. The food, the atmosphere and the wine... everything is perfect !
                </div>
                <div className>
                    There're gonna be some photos, HTML or MUI ?
                </div>
            </div>
        </div>
    </>
}

export default Posts;