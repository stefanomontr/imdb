export interface ProgressiveLoadingProps {
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export default function ProgressiveLoading(props: ProgressiveLoadingProps) {
  return (
    <>
      {
        props.hasNextPage &&
        <div onClick={props.fetchNextPage}>
          Load more...
        </div>
      }
    </>
  );
}