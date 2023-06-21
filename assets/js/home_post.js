{
    //method to submit form using ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#post-list>ul').prepend(newPost)
                    deletepost($('.delete-post-button',newPost))
                    new Noty({
                        theme:"relax",
                        text:"Post Uploaded",
                        type:"success",
                        layout:'topRight',
                        timeout:1500
                    }).show();
                    
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    let newPostDom=function(i){
        return $(`<li id="post-${i._id}">
        <p>
            
            <small>
                <a class="delete-post-button" href="/post/destroy/${i._id}">X</a>
            </small>
            ${i.content}
            <br> 
            
            <small>
                ${i.user.name}
                <%= i.createdAt.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' }) %>
            </small>
        </p>
        <div class="post-comments">
           
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comment">
                    <input type="hidden" name="post" value="${i._id}">
                    <button type="submit">Add Comment</button>
                </form>
             
                <div class="post-comment-list">
                    <ul id="post-comments-${i._id}">
                        
                    </ul>
                </div>
        </div>
    </li>
    
        `)
    }

    //method to delete a post from DOM
    let deletepost=function(deletelink){
        $(deletelink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deletelink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme:'relax',
                        text: 'Post Deleted',
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax=function(){
        //itterates over every li of #post-list
        $('#post-list>ul>li').each(function(){
            //current is assigned the current li
            let current=$(this);
            //selects the .delete-post-button of current li
            let deleteButton=$('.delete-post-button',current);
            deletepost(deleteButton);
        })
    }
    createPost();
    convertPostsToAjax();
}