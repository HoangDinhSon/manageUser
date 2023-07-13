function RowHeader() {
    return (
        <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Do</th>
            <th>Author</th>
            <th>Status</th>
            <th>Created Date</th>
            <th colSpan={4}>Action</th>
        </tr>
    );
}

export default RowHeader;
