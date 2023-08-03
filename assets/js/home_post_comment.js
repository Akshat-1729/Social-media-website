class PostComments{
    constructor(postId){
        this.postId=postId;
        this.postContainer=$(`#post-${postId}`);
        this.newCommentForm=$(`#comment-form-${postId}`);
        this.createComment(postId);
        let current=this;

        $('.delete-comment-button',this.postContainer).each(function(){
            current.deleteComment($(this));
        });

    }
    createComment(postId){
        let pself=this;
        let comText=$('.comment-text');
        this.newCommentForm.off('submit');
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let current=this;
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:$(current).serialize(),
                success:function(data){
                    let newcom=pself.newComment(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newcom);
                    pself.deleteComment($('.delete-comment-button',newcom));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                    comText.val('');
                },
                error:function(error){
                    console.log(error.responseText)
                }

            });
        });
        
    }
    newComment(comment){
        return $(`<li id="comment-${comment._id}">
        <p>
            
                <i class="fa-regular fa-comment"></i>
                ${comment.content}
                <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="fa-solid fa-trash delete-comm"></i></a>
                
            <br>
            <small>
                ${comment.user.name}
            </small>
        </p>
    </li>
    
        `)
    }
    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
}