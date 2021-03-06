import { h } from 'preact';
import { Link } from 'preact-router';

export default function (props) {
	let data = props.article;
	let author = data.author || {};
	let isFollow = author.following;
	let isFav = data.favorited;

	return (
		<div class="article-meta">
			<Link href={ `/@${author.username}` }>
				<img src={ author.image } />
			</Link>

			<div class="info">
				<Link href={ `/@${author.username}` } class="author">{ author.username }</Link>
				<span class="date">{ new Date(data.createdAt).toDateString() }</span>
			</div>

			{
				props.isOwner ? [
					<Link class="btn btn-outline-secondary btn-sm" href={ `/editor/${data.slug}` }>
						<i class="ion-edit" /> Edit Article
					</Link>,
					' ',
					<button class="btn btn-outline-danger btn-sm" onclick={ props.onDelete }>
						<i class="ion-trash-a" /> Delete Article
					</button>
				] : [
					<button class={ `btn btn-sm ${isFollow ? 'btn-secondary' : 'btn-outline-secondary'}` } onclick={ props.onFollow }>
						<i class="ion-plus-round" />
						{ isFollow ? 'Unf' : 'F' }ollow { author.username }
					</button>,
					' ',
					<button class={ `btn btn-sm ${isFav ? 'btn-primary' : 'btn-outline-primary'}` } onclick={ props.onFavorite }>
						<i class="ion-heart" />
						{ isFav ? 'Unf' : 'F' }avorite Post <span class="counter">({ data.favoritesCount })</span>
					</button>
				]
			}
		</div>
	)
}